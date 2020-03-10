<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Collection extends Model
{
    public function photos()
    {
        return $this->belongsToMany('App\Photo');
    }
}
