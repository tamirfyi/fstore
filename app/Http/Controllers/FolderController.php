<?php

namespace App\Http\Controllers;

use App\Models\File;
use App\Models\Folder;
use Carbon\Carbon;
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
        $folder = Folder::find($id);

        if (!$folder) {
            return response()->json(['message' => 'Folder not found'], 404);
        }

        $validated = $request->validate([
            'name' => 'nullable|string|max:255',
            'folder_id' => 'nullable|integer|exists:folders,id'
        ]);


        $folder->update([
            "name" => $validated['name'] ?? $folder->name,
            "folder_id" => $validated['folder_id'] ?? $folder->folder_id,
        ]);

        if ($request->op == "move") {
            if ($request->redirect) {
                return redirect(route('folders.show', $request->redirect));
            } else {
                return redirect(route('files.index'));
            }
        } else if ($request->op == "edit") {
            if ($request->folder_id) {
                return redirect(route('folders.show', $request->folder_id));
            } else {
                return redirect(route('files.index'));
            }
        }
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
