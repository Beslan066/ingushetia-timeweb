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
        Schema::create('national_projects', function (Blueprint $table) {
            $table->id();
            $table->string('title');
            $table->text('lead');
            $table->text('content');
            $table->string('image_main');
            $table->dateTime('published_at');

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
        Schema::dropIfExists('national_projects');
    }
};
