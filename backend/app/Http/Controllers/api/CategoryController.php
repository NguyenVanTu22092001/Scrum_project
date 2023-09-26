<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Category;

use Auth;
use Illuminate\Support\Facades\Validator;

class CategoryController extends Controller
{
    public function all()
    {
        $categories = Category::orderBy('name', 'asc')->get();
        $response = [
            'status' => 'success',
            'data' => [
                'categories' => $categories
            ]
        ];
        return response($response, 200);
    }
    public function create(Request $request)
    {
        $user = auth()->user();
        if ($user->level <= 5) {
            $response = [
                'status' => 'fail',
                'message' => 'You don\'t have permission for this'
            ];
            return response($response, 200);
        }

        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories',
            'image' => 'nullable|mimes:jpg,png'
        ], $this->errorMessages());

        if ($validator->fails()) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'error' => $errors = $validator->errors()
                ]
            ];
            return response($response, 200);
        }
        $category = Category::create($request->all());
        $response = [
            'status' => 'success',
            'data' => [
                'category' => $category
            ]
        ];
        return response($response, 200);
    }

    public function update(Request $request, $id)
    {
        $user = auth()->user();
        if ($user->level <= 5) {
            $response = [
                'status' => 'fail',
                'message' => 'You don\'t have permission for this'
            ];
            return response($response, 200);
        }

        $category = Category::where('id', $id)->first();
        if (!$category) {
            return response([
                'status' => 'fail',
                'message' => 'This category doesn\'t exixt in database'
            ], 200);
        }
        $validator = Validator::make($request->all(), [
            'name' => 'required|unique:categories,' . $id,
            'image' => 'nullable|mimes:jpg,png'
        ], $this->errorMessages());

        if ($validator->fails()) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'error' => $errors = $validator->errors()
                ]
            ];
            return response($response, 200);
        }
        $update = Category::where('id', $id)->update($request->all());
        if (!$update) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'Unknown error'
                ]
            ];
            return response($response, 201);
        }

        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    public function category($id)
    {
        $category = category::where('id', $id)->first();
        if (!$category) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'this category is either deleted or never exist in our database'
                ]
            ];
            return response($response, 200);
        }
        $response = [
            'status' => 'success',
            'data' => [
                'category' => $category
            ]
        ];
        return response($response, 200);
    }

    public function delete($id)
    {
        $user = auth()->user();
        if ($user->level <= 5) {
            $response = [
                'status' => 'fail',
                'message' => 'You don\'t have permission for this'
            ];
            return response($response, 200);
        }
        $category = Category::where('id', $id)->first();
        if (!$category) {
            $response = [
                'status' => 'fail',
                'data' => [
                    'message' => 'this category is either already deleted or never exist in our database'
                ]
            ];
            return response($response, 200);
        }
        Category::destroy($id);
        $response = [
            'status' => 'success'
        ];
        return response($response, 200);
    }

    private function errorMessages()
    {
        return [
            'name.required' => 'Name of the category please',
            'name.unique' => 'This category already exists',
            'image.mimes' => 'Only jpg or png image'
        ];
    }
}
