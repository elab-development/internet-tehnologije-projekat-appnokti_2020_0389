<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Slot extends Model
{
    use HasFactory;

    protected $table = 'slots';

    protected $fillable = [
        'time_slot',
    ];

    public function reservations()
    {
        return $this->hasMany(Reservation::class);
    }
}
