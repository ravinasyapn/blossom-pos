<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index() { return Category::orderBy('name')->get(); }

    public function store(Request $r)
    {
        $d = $r->validate(['name' => 'required|string|max:255']);
        return Category::create($d);
    }

    public function update(Request $r, Category $category)
    {
        $d = $r->validate(['name' => 'required|string|max:255']);
        $category->update($d);
        return $category;
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Deleted']);
    }
}
