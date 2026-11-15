namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    protected $fillable = [
        'transport', 'roads', 'water', 'electricity', 'gas',
        'local_admin', 'council', 'head_admin',
        'timezone', 'culture', 'tax',
        'education', 'social_category', 'age_group', 'location', 'gender',
        'ip_address',
    ];
}