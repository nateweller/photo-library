<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Photos extends Migration
{
    /**
     * Run the migrations.
	 * Creates the 'photos' table for storing data related to 
	 * photos uploaded to the library.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('photos', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->tinyInteger('status');
			$table->string('title');
			$table->text('description')->nullable();
			$table->string('url'); // AWS URL
			$table->string('tags')->nullable(); // comma delimited list of tags/keywords
			$table->bigInteger('author_id')->nullable(); // ID of user who uploaded the photo
			$table->text('photographer')->nullable(); // name of photographer 
			$table->bigInteger('width')->nullable(); // width of photo in pixels
			$table->bigInteger('height')->nullable(); // height of photo in pixels
			$table->timestamp('taken_at')->nullable(); // when the photo was taken
			$table->timestamp('created_at')->nullable(); // when the photo was uploaded
			$table->timestamp('updated_at')->nullable(); // when the photo was last updated
		});
    }

    /**
     * Reverse the migrations.
	 * Drops the 'photos' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('photos');
    }
}
