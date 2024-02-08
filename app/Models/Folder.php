<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Folder extends Model
{
    use HasFactory;
    // use HasUuids;

    protected $table = 'folders';
    protected $fillable = ['name', "user_id"];


    public function files(): HasMany
    {
        return $this->hasMany(File::class);
    }
}
