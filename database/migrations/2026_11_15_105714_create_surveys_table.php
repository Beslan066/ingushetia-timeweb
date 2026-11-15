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
        Schema::create('surveys', function (Blueprint $table) {
            $table->id();

            // Вопросы об удовлетворённости (1-9)
            $table->string('transport')->nullable();
            $table->string('roads')->nullable();
            $table->string('water')->nullable();
            $table->string('electricity')->nullable();
            $table->string('gas')->nullable();
            $table->string('local_admin')->nullable();
            $table->string('council')->nullable();
            $table->string('head_admin')->nullable();

            // Сезонное время
            $table->string('timezone')->nullable();

            // Учреждения культуры и налоговые
            $table->string('culture')->nullable();
            $table->string('tax')->nullable();

            // Социально-демографические данные
            $table->string('education')->nullable();
            $table->string('social_category')->nullable();
            $table->string('age_group')->nullable();
            $table->string('location')->nullable();
            $table->string('gender')->nullable();

            // IP и метаданные
            $table->ipAddress('ip_address')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('surveys');
    }
};
