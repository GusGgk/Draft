<?php
// database/migrations/2026_04_06_000005_create_historico_atleta_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('historicoAtleta', function (Blueprint $table) {
            $table->integer('idhistoricoAtleta')->autoIncrement();
            $table->string('club_name', 45)->nullable();
            $table->string('sport', 45)->nullable();
            $table->string('level', 45)->nullable();
            $table->string('started_at', 45)->nullable();
            $table->string('ended_at', 45)->nullable();
            $table->string('description', 45)->nullable();
            $table->string('midia', 45)->nullable();
            $table->integer('atleta_idAtleta'); // FK para atleta

            $table->foreign('atleta_idAtleta')
                  ->references('idAtleta')
                  ->on('atleta')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');

            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('historicoAtleta');
    }
};
