<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\News\StoreRequest;
use App\Http\Requests\Admin\News\UpdateRequest;
use App\Models\Category;
use App\Models\News;
use App\Models\PhotoReportage;
use App\Models\User;
use App\Models\Video;
use Binafy\LaravelUserMonitoring\Models\VisitMonitoring;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;


class NewsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $authUser = Auth::user()->agency_id;

        $news = News::query()->where('agency_id', auth()->user()->agency_id)->with('user', 'category', 'video')->orderBy('published_at', 'desc')->paginate(10);
        $agencyNews = News::query()->where('agency_id', $authUser)->paginate(10);

        return view('admin.news.index', compact('news', 'agencyNews' ));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {

        $reportages = PhotoReportage::all();
        $videos = Video::all();
        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();


        return view('admin.news.create', compact('authors', 'categories', 'videos', 'reportages'));
    }

    /**
     * Store a newly created resource in storage.
     */
  private function processImage($image)
  {
    // Генерируем уникальные имена файлов
    $originalExtension = $image->getClientOriginalExtension();
    $uniqueName = Str::uuid();

    $paths = [
      'original' => "news/images/{$uniqueName}.{$originalExtension}",
      'webp' => "news/webp/{$uniqueName}.webp"
    ];

    // Сохраняем оригинальное изображение
    Storage::put($paths['original'], file_get_contents($image));

    // Создаем WebP версию
    $imageInfo = getimagesize($image->path());
    $mimeType = $imageInfo['mime'];

    switch ($mimeType) {
      case 'image/jpeg':
        $sourceImage = imagecreatefromjpeg($image->path());
        break;
      case 'image/png':
        $sourceImage = imagecreatefrompng($image->path());
        break;
      case 'image/gif':
        $sourceImage = imagecreatefromgif($image->path());
        break;
      default:
        throw new \Exception('Unsupported image type');
    }

    // Сохраняем WebP в временный файл
    $tempWebpPath = tempnam(sys_get_temp_dir(), 'webp');
    imagewebp($sourceImage, $tempWebpPath, 90);
    imagedestroy($sourceImage);

    // Загружаем WebP в хранилище
    Storage::put($paths['webp'], file_get_contents($tempWebpPath));
    unlink($tempWebpPath);

    return $paths;
  }

  public function store(StoreRequest $request)
  {
    $data = $request->validated();

    if ($request->hasFile('image_main')) {
      $paths = $this->processImage($request->file('image_main'));
      $data['image_main'] = $paths['original'];
      $data['image_webp'] = $paths['webp'];
    }

    $data['url'] = Str::slug($data['title']);
    $data['main_material'] = $request->has('main_material') ? 1 : 0;

    News::create($data);
    return redirect()->route('admin.news.index');
  }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(News $news)
    {


        $reportages = PhotoReportage::all();
        $videos = Video::all();

        $categories = Category::all();
        $authors = User::query()->where('role', 10)->get();

        return view('admin.news.edit', compact('news', 'categories', 'authors', 'videos', 'reportages'));
    }

    /**
     * Update the specified resource in storage.
     */
  public function update(UpdateRequest $request, News $news)
  {
    $data = $request->validated();

    if ($request->hasFile('image_main')) {
      // Удаляем старые файлы
      Storage::delete([$news->image_main, $news->image_webp]);

      // Обрабатываем новое изображение
      $paths = $this->processImage($request->file('image_main'));
      $data['image_main'] = $paths['original'];
      $data['image_webp'] = $paths['webp'];
    }

    $data['url'] = Str::slug($data['title']);
    $data['main_material'] = $request->has('main_material') ? 1 : 0;

    $news->update($data);
    return redirect()->route('admin.news.index')->with('success', 'News updated successfully');
  }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(News $news)
    {
        $news->delete();
        return to_route('admin.news.index');
    }
}
