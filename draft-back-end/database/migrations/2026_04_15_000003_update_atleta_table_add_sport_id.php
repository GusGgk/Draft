<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('atleta', function (Blueprint $table) {
            // Converter colunas de string para decimal para permitir filtros numéricos
            $table->decimal('height_cm', 5, 1)->nullable()->change();
            $table->decimal('weight_kg', 5, 1)->nullable()->change();

            // Adicionar FK para tabela sports (substituindo a string primary_sport)
            $table->unsignedBigInteger('sport_id')->nullable()->after('nationality');

            $table->foreign('sport_id')
                  ->references('id')
                  ->on('sports')
                  ->onDelete('set null');
        });
    }

    public function down(): void
    {
        Schema::table('atleta', function (Blueprint $table) {
            $table->dropForeign(['sport_id']);
            $table->dropColumn('sport_id');

            $table->string('height_cm', 45)->nullable()->change();
            $table->string('weight_kg', 45)->nullable()->change();
        });
    }
};
