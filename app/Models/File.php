<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;
    // use HasUuids;

    protected $table = 'files';
    protected $fillable = ['name'];

    // public function folder(): BelongsTo
    // {
    //     return $this->belongsTo(Folder::class);
    // }
}
