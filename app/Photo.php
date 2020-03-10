<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Photo extends Model
{
    protected $fillable = [
        'id',
        'status',
        'title',
        'description',
        'url',
        'tags',
        'author_id',
        'photographer',
        'width',
        'height',
        'taken_at',
    ];

    public function collections()
    {
        return $this->belongsToMany('App\Collection');
    }

    public function subjects()
    {
        return $this->belongsToMany('App\Subject');
    }
}
