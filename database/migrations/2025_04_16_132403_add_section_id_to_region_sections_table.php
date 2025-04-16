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
      Schema::table('region_sections', function (Blueprint $table) {
        $table->string('section_id')->nullable()->after('region_id');
      });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
      Schema::table('region_sections', function (Blueprint $table) {
        $table->dropColumn('section_id');
      });
    }
};
