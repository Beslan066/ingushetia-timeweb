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
        Schema::table('government_documents', function (Blueprint $table) {
          $table->dateTime('published_at');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('government_documents', function (Blueprint $table) {
            Schema::dropColumn('published_at');
        });
    }
};
