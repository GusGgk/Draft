<?php
// database/migrations/2026_04_06_000002_create_instituicao_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instituicao', function (Blueprint $table) {
            $table->integer('idInstituicao')->autoIncrement();
            $table->string('organization_name', 45)->nullable();
            $table->string('cnpj', 45)->nullable();
            $table->string('institution_type', 45)->nullable();
            $table->string('sports', 45)->nullable();
            $table->string('founded_year', 45)->nullable();
            $table->string('city', 45)->nullable();
            $table->string('state', 45)->nullable();
            $table->string('country', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->string('logo_path', 45)->nullable();
            $table->string('website', 45)->nullable();
            $table->unsignedBigInteger('users_id');
            $table->timestamps();

            $table->foreign('users_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instituicao');
    }
};
