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

    /**
     * Add Tags
     *
     * @param string $tagString Comma-delimited list of tags to add
     * @return string The new value of $this->tags
     */
    public function addTags($tagString) {
        $newTags = explode(',', $tagString);
        $currentTags = explode(',', $this->tags);
        foreach ($newTags as $newTag) {
            $newTag = trim($newTag);
            if (!in_array($newTag, $currentTags)) {
                $this->tags .= ",$newTag";
            }
        }
        return $this->tags;
    }

}
