<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ServiceType extends Model
{
    use HasFactory;

    protected $table = 'service_types';

    protected $fillable = [
        'type_name',
    ];

    public function services()
    {
        return $this->hasMany(Service::class);
    }
}
