<?php
// database/migrations/2026_04_06_000004_create_agente_atleta_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('agenteAtleta', function (Blueprint $table) {
            $table->integer('idAgenteAtleta')->autoIncrement();
            $table->string('status', 45)->nullable();
            $table->string('requested_at', 45)->nullable();
            $table->string('responded_at', 45)->nullable();
            $table->string('ended_at', 45)->nullable();
            $table->string('notes', 45)->nullable();
            $table->integer('agente_idAgente'); // FK para agente
            $table->integer('atleta_idAtleta'); // FK para atleta

            $table->foreign('agente_idAgente')
                  ->references('idAgente')
                  ->on('agente')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');

            $table->foreign('atleta_idAtleta')
                  ->references('idAtleta')
                  ->on('atleta')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('agenteAtleta');
    }
};
