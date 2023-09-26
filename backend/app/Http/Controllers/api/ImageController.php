<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\View;
use Illuminate\Support\Facades\Response;
use Image;

class ImageController extends Controller
{
    public function original(Request $request, $image)
    {
        $path = asset('storage/images/products/original/' . $image);
    }
    public function thumb(Request $request, $image)
    {
        $path = asset('storage/images/thumb/' . $image);
        return Response::download($path);
    }
}
