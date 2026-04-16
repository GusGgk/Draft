<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        if (!Schema::hasColumn('atleta', 'headline')) {
            Schema::table('atleta', function (Blueprint $table) {
                $table->string('headline', 120)->nullable()->after('bio');
            });
        }

        if (!Schema::hasColumn('atleta', 'instagram')) {
            Schema::table('atleta', function (Blueprint $table) {
                $table->string('instagram', 100)->nullable()->after('headline');
            });
        }

        if (!Schema::hasColumn('instituicao', 'phone')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->string('phone', 30)->nullable()->after('website');
            });
        }

        if (!Schema::hasColumn('instituicao', 'headline')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->string('headline', 120)->nullable()->after('description');
            });
        }

        if (!Schema::hasColumn('instituicao', 'instagram')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->string('instagram', 100)->nullable()->after('headline');
            });
        }

        if (!Schema::hasColumn('agente', 'headline')) {
            Schema::table('agente', function (Blueprint $table) {
                $table->string('headline', 120)->nullable()->after('bio');
            });
        }

        if (!Schema::hasColumn('agente', 'linkedin')) {
            Schema::table('agente', function (Blueprint $table) {
                $table->string('linkedin', 500)->nullable()->after('website');
            });
        }
    }

    public function down(): void
    {
        if (Schema::hasColumn('atleta', 'instagram')) {
            Schema::table('atleta', function (Blueprint $table) {
                $table->dropColumn('instagram');
            });
        }

        if (Schema::hasColumn('atleta', 'headline')) {
            Schema::table('atleta', function (Blueprint $table) {
                $table->dropColumn('headline');
            });
        }

        if (Schema::hasColumn('instituicao', 'instagram')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->dropColumn('instagram');
            });
        }

        if (Schema::hasColumn('instituicao', 'headline')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->dropColumn('headline');
            });
        }

        if (Schema::hasColumn('instituicao', 'phone')) {
            Schema::table('instituicao', function (Blueprint $table) {
                $table->dropColumn('phone');
            });
        }

        if (Schema::hasColumn('agente', 'linkedin')) {
            Schema::table('agente', function (Blueprint $table) {
                $table->dropColumn('linkedin');
            });
        }

        if (Schema::hasColumn('agente', 'headline')) {
            Schema::table('agente', function (Blueprint $table) {
                $table->dropColumn('headline');
            });
        }
    }
};