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
        Schema::create('regions', function (Blueprint $table) {
            $table->id();
            $table->text('main_info');
            $table->mediumText('history_region')->nullable();
            $table->text('geographic')->nullable();
            $table->text('climate')->nullable();
            $table->text('hydrography')->nullable();
            $table->text('wild_nature')->nullable();
            $table->text('ecology')->nullable();
            $table->text('demography')->nullable();
            $table->text('administrative_division')->nullable();
            $table->text('economic')->nullable();
            $table->text('gross_product')->nullable();
            $table->text('industrial_production')->nullable();
            $table->text('investments')->nullable();
            $table->text('consumer_market')->nullable();
            $table->text('live_standards')->nullable();
            $table->text('construction')->nullable();
            $table->text('transport')->nullable();
            $table->text('finance')->nullable();
            $table->text('comfortable_urban_environment')->nullable();
            $table->text('gazification')->nullable();
            $table->text('labor_and_employment')->nullable();
            $table->text('sport')->nullable();
            $table->text('culture')->nullable();
            $table->text('tourism')->nullable();
            $table->text('medicine')->nullable();
            $table->text('education')->nullable();
            $table->text('protection_of_motherhood')->nullable();
            $table->text('people_social_protection')->nullable();
            $table->text('types_of_economic_activities')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('regions');
    }
};
