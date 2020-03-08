<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PhotoController extends Controller
{
    /** @var SpacesConnect $space */
    private $space;

    function __construct()
    {
        // initalize utility for working with Digital Ocean object storage
        $this->space = new \SpacesConnect(
            env('DIGITALOCEAN_KEY'),
            env('DIGITALOCEAN_SECRET'),
            env('DIGITALOCEAN_SPACE')
        );
    }

    public function fetchPhotos(Request $request)
    {
        // to do: single photo result via ID
        // to do: array of photos result via search params:
            // keyword search
            // collection filter
            // date filters
            // photographer search
            // status filter
            // size filters
            // model search
        return App\Photo::where('status', Config::get('constants.status.published'))
            ->take(25)
            ->get();
    }

    public function uploadPhoto(Request $request)
    {
        // to do: generate and save YYYY/MM/example.jpg folder structure when uploading to Digital Ocean
        // to do: ensure image path is unique when uploading to Digital Ocean
        // to do: re-enable auth middleware and insert current user ID as author_id

        // 1. validate request
        if ($request->input('id')) {
            // update existing photo - all fields optional
            $photoData = $request->validate([
                'id'            => 'required|numeric',
                'status'        => 'nullable|numeric',
                'title'         => 'nullable|string',
                'description'   => 'nullable|string',
                'tags'          => 'nullable|string',
                'photographer'  => 'nullable|string',
                'taken_at'      => 'nullable|date'
            ]);
        } else {
            // new photo - require minimum necessary fields
            $photoData = $request->validate([
                'status'        => 'required|numeric',
                'title'         => 'required|string',
                'description'   => 'nullable|string',
                'tags'          => 'nullable|string',
                'photographer'  => 'nullable|string',
                'taken_at'      => 'nullable|date',
                'photo'         => 'nullable|image'
            ]);
            // generate additional fields
            $photoData['width']         = getimagesize($request->file('photo'))[0];
            $photoData['height']        = getimagesize($request->file('photo'))[1];
            $photoData['author_id']     = 0; // to do: Auth::user()->id
        }
        // 2. upload photo to Digital Ocean
        if ($request->hasFile('photo')) {
            $photoFile = $request->file('photo');
            $photoFilePath = $photoFile->getClientOriginalName();
            $uploadResponse = $this->space->UploadFile($photoFilePath, "public");
            if ($uploadResponse['ObjectURL']) {
                $photoData['url'] = $uploadResponse['ObjectURL'];
            } else {
                abort(500, 'Upload to cloud storage failed. Please try again.');
            }
        }
        // 3. save the photo data
        $photo = new \App\Photo($photoData);
        $photoSaved = $photo->save();
        if (!$photoSaved) {
            abort(500, 'An error occured saving the photo details. Please try again.');
        }
        return $photo;
    }
}
