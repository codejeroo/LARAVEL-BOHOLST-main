    <?php

    use Illuminate\Database\Migrations\Migration;
    use Illuminate\Database\Schema\Blueprint;
    use Illuminate\Support\Facades\Schema;

    class CreateStudentsTable extends Migration
    {
        /**
         * Run the migrations.
         */
        public function up()
        {
            Schema::create('students', function (Blueprint $table) {
                $table->id();
                $table->string('name');      // student full name
                $table->string('email')->unique(); // email
                $table->string('course'); // course
                $table->timestamps();
            });
        }

        /**
         * Reverse the migrations.
         */
        public function down()
        {
            Schema::dropIfExists('students');
        }
    }
