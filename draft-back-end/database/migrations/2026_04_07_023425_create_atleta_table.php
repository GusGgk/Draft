<?php
// database/migrations/2026_04_06_000001_create_atleta_table.php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('atleta', function (Blueprint $table) {
            $table->integer('idAtleta')->autoIncrement(); // PK com auto increment
            $table->string('nickname', 45)->nullable();
            $table->string('birth_date', 45)->nullable();
            $table->string('nationality', 45)->nullable();
            $table->string('primary_sport', 45)->nullable();
            $table->string('position', 45)->nullable();
            $table->string('height_cm', 45)->nullable();
            $table->string('weight_kg', 45)->nullable();
            $table->string('dominant_foot', 45)->nullable();
            $table->string('dominant_hand', 45)->nullable();
            $table->string('avaliability', 45)->nullable();
            $table->string('avatar_path', 45)->nullable();
            $table->string('bio', 45)->nullable();
            $table->string('endereco', 45)->nullable();
            $table->unsignedBigInteger('users_id'); // FK para users
            $table->timestamps(); // created_at e updated_at

            $table->foreign('users_id')
                  ->references('id')
                  ->on('users')
                  ->onDelete('restrict')
                  ->onUpdate('restrict');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('atleta');
    }
};
