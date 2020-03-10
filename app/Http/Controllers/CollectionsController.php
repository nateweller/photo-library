<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CollectionsController extends Controller
{
    public function fetchCollections(Request $request) {
        // fetch single collection by ID
        if ($request->input('id')) {
            return \App\Collection::findOrFail($request->input('id'));
        }
        // return all collections (default)
        return \App\Collection::get();
    }

    public function saveCollection(Request $request) {
        // 1. validate request
        if ($request->input('id')) {
            // update existing collection - all fields optional
            $collectionData = $request->validate([
                'id'            => 'nullable|number',
                'name'          => 'nullable|string',
                'description'   => 'nullable|string'
            ]);
        } else {
            // new collection - require minimum necessary fields
            $collectionData = $request->validate([
                'name'          => 'required|string',
                'description'   => 'nullable|string'
            ]);
        }
        // 2. save collection data
        $collection = new \App\Collection($collectionData);
        $collectionSaved = $collection->save();
        if (!$collectionSaved) {
            abort(500, 'An error occured saving the collection details. Please try again.');
        }
        return $collection;
    }
}
