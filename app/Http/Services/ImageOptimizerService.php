<?php

namespace App\Services;

use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\Storage;

class ImageOptimizerService
{
  public static function optimizeAndConvertToWebp($imageFile, $folder = 'images')
  {
    // Генерация уникального имени файла
    $originalName = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
    $hash = md5(time() . $originalName);
    $originalPath = "{$folder}/{$hash}." . $imageFile->getClientOriginalExtension();
    $webpPath = "{$folder}/{$hash}.webp";

    // Сохраняем оригинал (если нужно)
    Storage::putFileAs('', $imageFile, $originalPath);

    // Оптимизация и конвертация в WebP
    $img = Image::make($imageFile)
      ->resize(1920, null, function ($constraint) {
        $constraint->aspectRatio();
        $constraint->upsize();
      })
      ->encode('webp', config('app.image_quality', 80));

    Storage::put($webpPath, (string)$img);

    return [
      'original' => $originalPath,
      'webp' => $webpPath
    ];
  }
}
