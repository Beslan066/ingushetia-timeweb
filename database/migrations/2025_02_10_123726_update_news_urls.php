<?php

use App\Models\News;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up()
  {
    // Обрабатываем записи пачками по 500 штук
    News::whereNull('url')->orWhere('url', '')->chunk(50000, function ($newsItems) {
      foreach ($newsItems as $news) {
        $news->url = Str::slug($news->title);
        while (News::where('url', $news->url)->exists()) {
          $news->url = $news->url . '-' . uniqid(); // Добавляем уникальный идентификатор
        }
        $news->save();
      }
    });
  }

    /**
     * Reverse the migrations.
     */
  public function down()
  {
    // Откат миграции (опционально)
    // Если нужно откатить изменения, можно очистить все URL
    News::whereNotNull('url')->update(['url' => null]);
  }
};
