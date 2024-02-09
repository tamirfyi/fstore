<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FolderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'folder_id' => 'integer|nullable',
        ]);

        Folder::create([
            "name" => $validated['name'],
            "folder_id" => $validated['folder_id'],
            "user_id" => auth()->id()
        ]);

        if ($request->folder_id) {
            return redirect(route('folders.show', $request->folder_id));
        } else {
            return redirect(route('files.index'));
        };
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $files = File::where('folder_id', $id)->get();
        $folders = Folder::where('folder_id', $id)->get();


        return Inertia::render('Files', [
            'files' => $files,
            'folders' => $folders,
            'folder_id' => $id,
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        Folder::find($id)->delete();
        return redirect(route('files.index'));
    }
}
