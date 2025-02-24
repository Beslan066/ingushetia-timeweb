<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\News;
use Illuminate\Support\Str;


class GenerateNewsUrls extends Command
{
  protected $signature = 'generate:news-urls';
  protected $description = 'Generate URLs for news based on their titles';

  public function handle()
  {
    News::where(function ($query) {
      $query->whereNull('url')->orWhere('url', '');
    })
      ->chunkById(1000, function ($newsItems) {
        foreach ($newsItems as $news) {
          $slug = $this->generateSlug($news->title);
          $originalSlug = $slug;
          $count = 1;

          // Проверяем уникальность URL
          while (News::where('url', $slug)->exists()) {
            $slug = "{$originalSlug}-{$count}";
            $count++;
          }

          $news->url = $slug;
          $news->save();
        }
      });

    $this->info('URLs успешно сгенерированы.');
  }

  private function generateSlug($title)
  {
    // Транслитерация русских символов
    $transliteration = [
      'а' => 'a', 'б' => 'b', 'в' => 'v', 'г' => 'g', 'д' => 'd', 'е' => 'e', 'ё' => 'yo', 'ж' => 'zh',
      'з' => 'z', 'и' => 'i', 'й' => 'y', 'к' => 'k', 'л' => 'l', 'м' => 'm', 'н' => 'n', 'о' => 'o',
      'п' => 'p', 'р' => 'r', 'с' => 's', 'т' => 't', 'у' => 'u', 'ф' => 'f', 'х' => 'h', 'ц' => 'ts',
      'ч' => 'ch', 'ш' => 'sh', 'щ' => 'sch', 'ъ' => '', 'ы' => 'y', 'ь' => '', 'э' => 'e', 'ю' => 'yu',
      'я' => 'ya', ' ' => '-', '_' => '-'
    ];

    // Приводим к нижнему регистру и заменяем символы
    $slug = mb_strtolower($title);
    $slug = strtr($slug, $transliteration);

    // Удаляем специальные символы и лишние дефисы
    $slug = preg_replace('/[^a-z0-9\-]/', '', $slug);
    $slug = preg_replace('/-+/', '-', $slug);
    $slug = trim($slug, '-');

    // Ограничиваем длину URL
    return substr($slug, 0, 255);
  }
}
