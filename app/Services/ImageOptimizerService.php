<?php

namespace App\Services;

use Illuminate\Support\Facades\Storage;
use Intervention\Image\ImageManager;

class ImageOptimizerService {
  public static function optimizeAndConvertToWebp($imageFile, $folder = 'images') {
    $manager = new ImageManager(['driver' => 'gd']);
    $originalName = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
    $hash = md5(time() . $originalName);
    $originalPath = "$folder/$hash." . $imageFile->extension();
    $webpPath = "$folder/$hash.webp";

    // Сохраняем оригинал
    Storage::putFileAs('', $imageFile, $originalPath);

    // Оптимизация и WebP
    $img = $manager->make($imageFile)
      ->resize(1920, null, fn ($constraint) => $constraint->aspectRatio()->upsize())
      ->encode('webp', config('app.image_quality', 80));

    Storage::put($webpPath, (string)$img);

    return [
      'original' => $originalPath,
      'webp' => $webpPath
    ];
  }
}
