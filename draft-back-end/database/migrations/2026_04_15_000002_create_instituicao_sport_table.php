<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('instituicao_sport', function (Blueprint $table) {
            $table->id();
            $table->integer('instituicao_id');
            $table->unsignedBigInteger('sport_id');
            $table->timestamps();

            $table->foreign('instituicao_id')
                  ->references('idInstituicao')
                  ->on('instituicao')
                  ->onDelete('cascade');

            $table->foreign('sport_id')
                  ->references('id')
                  ->on('sports')
                  ->onDelete('cascade');

            $table->unique(['instituicao_id', 'sport_id']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('instituicao_sport');
    }
};
