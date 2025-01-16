<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('photo_reportages', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->string('lead')->nullable();
            $table->string('image_main');
            $table->json('slides')->nullable();
            $table->foreignId('news_id')->nullable()->constrained();
            $table->dateTime('published_at');
            $table->foreignId('user_id')->nullable()->constrained();
            $table->foreignId('agency_id')->nullable()->constrained();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('photo_reportages');
    }
};
