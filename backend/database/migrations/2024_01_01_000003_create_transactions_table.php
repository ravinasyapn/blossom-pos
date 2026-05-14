<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void {
        Schema::create('transactions', function (Blueprint $t) {
            $t->id();
            $t->string('customer')->default('Pelanggan');
            $t->string('method', 20)->default('Tunai');
            $t->decimal('subtotal', 12, 2)->default(0);
            $t->decimal('paid', 12, 2)->default(0);
            $t->decimal('change', 12, 2)->default(0);
            $t->timestamps();
        });

        Schema::create('transaction_items', function (Blueprint $t) {
            $t->id();
            $t->foreignId('transaction_id')->constrained()->cascadeOnDelete();
            $t->string('name');
            $t->integer('qty');
            $t->decimal('price', 12, 2);
            $t->string('unit', 50)->nullable();
            $t->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('transaction_items');
        Schema::dropIfExists('transactions');
    }
};
