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
        Schema::create('vector_sections', function (Blueprint $table) {
          $table->id();
          $table->foreignId('vector_id')->constrained()->onDelete('cascade');
          $table->string('title');
          $table->text('content');
          $table->string('section_id')->nullable()->after('vector_id');
          $table->timestamps();
          $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('vector_sections');
    }
};
