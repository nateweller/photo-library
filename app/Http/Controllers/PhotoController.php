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

    // to do: pagination support
    public function fetchPhotos(Request $request)
    {
        // fetch single photo via ID
        if ($request->input('id')) {
            return \App\Photo::findOrFail($request->input('id'));
        }
        // check request for filter paramaters and build query if found
        $filters = [];
        if ($request->input('search')) {
            $filters[] = \App\Photo::where('title', 'LIKE', "%{$request->input('search')}%");
            $filters[] = \App\Photo::where('description', 'LIKE', "%{$request->input('search')}%");
            $filters[] = \App\Photo::where('tags', 'LIKE', "%{$request->input('search')}%");
        }
        if ($request->input('collections')) {
            // to do - query from collection_photo
        }
        if ($request->input('min_taken_at')) {
            $filters[] = \App\Photo::where('taken_at', '>=', $request->input('min_taken_at'));
        }
        if ($request->input('max_taken_at')) {
            $filters[] = \App\Photo::where('taken_at', '<=', $request->input('max_taken_at'));
        }
        if ($request->input('min_created_at')) {
            $filters[] = \App\Photo::where('created_at', '>=', $request->input('min_created_at'));
        }
        if ($request->input('max_created_at')) {
            $filters[] = \App\Photo::where('created_at', '>=', $request->input('max_created_at'));
        }
        if ($request->input('photographer')) {
            $filters[] = \App\Photo::where('photographer', 'LIKE', "%{$request->input('photographer')}%");
        }
        if ($request->input('status')) {
            $filters[] = \App\Photo::where('status', '=', $request->input('status'));
        }
        if ($request->input('min_width')) {
            $filters[] = \App\Photo::where('width', '>=', $request->input('max_width'));
        }
        if ($request->input('max_width')) {
            $filters[] = \App\Photo::where('width', '<=', $request->input('max_width'));
        }
        if ($request->input('min_height')) {
            $filters[] = \App\Photo::where('height', '>=', $request->input('max_height'));
        }
        if ($request->input('max_height')) {
            $filters[] = \App\Photo::where('height', '<=', $request->input('max_height'));
        }
        if ($request->input('orientation')) {
            switch ($request->input('orientation')) {
                case 'landscape':
                    $filters[] = \App\Photo::whereColumn('height', '<', 'width');
                    break;
                case 'portrait':
                    $filters[] = \App\Photo::whereColumn('height', '>', 'width');
                    break;
                case 'square':
                    $filters[] = \App\Photo::whereColumn('height', 'width');
                    break;
                default:
                    // ignore invalid orientation filters
                    break;
            }
        }
        if ($request->input('models')) {
            // to do - query from model_photo
        }
        // return filtered results
        if (!empty($filters)) {
            $results = $filters[0];
            foreach ($filters as $i => $filter) {
                if ($i === 0) continue; // first filter is already initialized
                $results = $results->union($filter);
            }
            return $results->get();
        }
        // return latest 25 photos (default)
        return \App\Photo::where('status', \Config::get('constants.status.published'))
            ->latest()
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
