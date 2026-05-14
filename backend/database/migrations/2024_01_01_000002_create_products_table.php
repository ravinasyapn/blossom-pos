<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('products', function (Blueprint $t) {
            $t->id();
            $t->string('name');
            $t->decimal('price', 12, 2)->default(0);
            $t->string('unit', 50)->default('tangkai');
            $t->foreignId('category_id')->constrained()->cascadeOnDelete();
            $t->integer('stock')->default(0);
            $t->text('image')->nullable();
            $t->timestamps();
        });
    }
    public function down(): void { Schema::dropIfExists('products'); }
};
