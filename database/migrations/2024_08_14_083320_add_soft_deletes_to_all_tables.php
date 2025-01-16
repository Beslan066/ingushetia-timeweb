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
        Schema::table('all_tables', function (Blueprint $table) {
            $tables = [
                'users',
                'agencies',
                'agency_activities',
                'categories',
                'contacts',
                'documents',
                'military_supports',
                'municipalities',
                'national_projects',
                'news',
                'news_ings',
                'pages',
                'photo_reportages',
                'regions',
                'resources',
                'supervisors',
                'videos',
                ];

            foreach ($tables as $table) {
                Schema::table($table, function (Blueprint $table) {
                    $table->softDeletes(); // Добавляет колонку `deleted_at`
                });
            }
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('all_tables', function (Blueprint $table) {
            $tables = [
                'users',
                'agencies',
                'agency_activities',
                'categories',
                'contacts',
                'documents',
                'military_supports',
                'municipalities',
                'national_projects',
                'news',
                'news_ings',
                'pages',
                'photo_reportages',
                'regions',
                'resources',
                'supervisors',
                'videos',
            ];
            foreach ($tables as $table) {
                Schema::table($table, function (Blueprint $table) {
                    $table->dropSoftDeletes();
                });
            }
        });
    }
};
