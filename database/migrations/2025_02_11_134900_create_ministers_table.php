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
        Schema::create('ministers', function (Blueprint $table) {
          $table->id();
          $table->string('name');
          $table->string('image_main');
          $table->string('position');
          $table->text('bio')->nullable();
          $table->foreignId('user_id')->constrained()->onDelete('cascade');
          $table->softDeletes();
          $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('ministers');
    }
};
