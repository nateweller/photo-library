<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Subjects extends Migration
{
    /**
     * Run the migrations.
	 * Creates the 'subjects' table for storing data related to
	 * people shown in photos.
	 * Creates the 'subject_photos" table for managing relationships
	 * between subjects and the photos they are shown in.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('subjects', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('headshot_url');
			$table->string('phone_number');
			$table->string('email_address');
			$table->text('description');
		});
		Schema::create('subject_photo', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('subject_id');
			$table->bigInteger('photo_id');
		});
    }

    /**
     * Reverse the migrations.
	 * Drops the 'subjects' table.
	 * Drops the 'subject_photos' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('subjects');
		Schema::dropIfExists('subject_photos');
    }
}
