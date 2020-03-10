<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    public function photos()
    {
        return $this->belongsToMany('App\Photo');
    }
}
