<?php
// database/migrations/2026_04_06_000003_create_agente_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agente', function (Blueprint $table) {
            $table->integer('idAgente')->autoIncrement();
            $table->string('agency_name', 45)->nullable();
            $table->string('license_number', 45)->nullable();
            $table->string('sports_represented', 45)->nullable();
            $table->string('countries_active', 45)->nullable();
            $table->string('bio', 45)->nullable();
            $table->string('avatar_path', 45)->nullable();
            $table->string('phone', 45)->nullable();
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
        Schema::dropIfExists('agente');
    }
};
