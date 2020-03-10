<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    public $timestamps = false;

    protected $fillable = ['id', 'name', 'description'];

    public function photos()
    {
        return $this->belongsToMany('App\Photo');
    }
}
