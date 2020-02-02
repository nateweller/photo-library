<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class Models extends Migration
{
    /**
     * Run the migrations.
	 * Creates the 'models' table for storing data related to
	 * people shown in photos.
	 * Creates the 'model_photos" table for managing relationships
	 * between models and the photos they are shown in.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('models', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('first_name');
			$table->string('last_name');
			$table->string('headshot_url');
			$table->string('phone_number');
			$table->string('email_address');
			$table->text('description');
		});
		Schema::create('model_photos', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('model_id');
			$table->bigInteger('photo_id');
		});
    }

    /**
     * Reverse the migrations.
	 * Drops the 'models' table.
	 * Drops the 'model_photos' table.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('models');
		Schema::dropIfExists('model_photos');
    }
}
