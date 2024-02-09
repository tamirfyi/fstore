<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Illuminate\Http\Request;
use Inertia\Inertia;

class FileController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $files = File::where('folder_id', null)->get()->map(function ($file) {
            return [
                'id' => $file->id,
                'name' => $file->name,
                'created_at' => $file->created_at->toDateTimeString(),
                'updated_at' => $file->updated_at->toDateTimeString(),
                'folder_id' => $file->folder_id,
                'user_id' => $file->user_id,
            ];
        });

        $folders = Folder::where('folder_id', null)->get()->map(function ($file) {
            return [
                'id' => $file->id,
                'name' => $file->name,
                'created_at' => $file->created_at->toDateTimeString(),
                'updated_at' => $file->updated_at->toDateTimeString(),
                'user_id' => $file->user_id,
            ];
        });

        return Inertia::render('Files', [
            'files' => $files,
            'folders' => $folders,
        ]);
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

        File::create([
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
        return $id;
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
        File::find($id)->delete();
        return redirect(route('files.index'));
    }

    /**
     * Additionl file pages
     */

    public function shared()
    {
        return Inertia::render('SharedFiles');
    }

    public function deleted()
    {
        return Inertia::render('DeletedFiles');
    }
}
