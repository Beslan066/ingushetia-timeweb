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
        Schema::create('mountains', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('content');
            $table->string('image_main');
            $table->string('image_author')->nullable();
            $table->string('image_description')->nullable();
            $table->string('year')->nullable();
            $table->string('location')->nullable();
            $table->string('coordinates')->nullable();
            $table->string('see_height')->nullable();
            $table->string('structure')->nullable();
            $table->foreignId('user_id')->constrained();
            $table->unsignedBigInteger('reportage_id')->nullable()->after('reportage_id');
            $table->foreign('reportage_id')->references('id')->on('photo_reportages')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('mountains');
    }
};
