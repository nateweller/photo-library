<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Collections extends Migration
{
    /**
     * Run the migrations.
	 * Creates the 'collections' table for storing data related to
	 * curated groups of photos.
	 * Creates the 'collection_photos" table for managing relationships
	 * between groups and the photos they contain.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('collections', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('name');
			$table->text('description')->nullable();
		});
		Schema::create('collection_photo', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('collection_id');
			$table->bigInteger('photo_id');
		});
    }

    /**
     * Reverse the migrations.
	 * Drops the 'collections' table.
	 * Drops the 'collection_photos' table.
     *
     * @return void
     */
    public function down()
    {
		Schema::dropIfExists('collections');
		Schema::dropIfExists('collection_photos');
    }
}
