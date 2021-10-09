<?php

namespace App\Http\Controllers;

use Illuminate\Support\Str;
use Illuminate\Support\Arr;
use Illuminate\Support\Facades\File;

class BentleyController extends Controller
{
    public function random()
    {
        [$imageId] = $this->getIdAndUrlFromPath($this->getRandomImagePath());

        return request()->routeIs('random')
                ? $this->renderPage($imageId)
                : redirect()->route('viewImage', compact('imageId'));
    }

    public function apiRandom()
    {
        return $this->apiRenderPage(...$this->getIdAndUrlFromPath(
            $this->getRandomImagePath()
        ));
    }

    public function viewImage($imageId)
    {
        $imagePath = $this->getPathFromId($imageId);

        return $this->imageExists($imagePath) 
                ? $this->renderPage($imageId) 
                : $this->random();
    }

    public function apiViewImage($imageId)
    {
        $imagePath = $this->getPathFromId($imageId);

        return $this->imageExists($imagePath)
                ? $this->apiRenderPage(...$this->getIdAndUrlFromPath($imagePath))
                : abort(404);
    }

    private function renderPage($imageId)
    {
        return response()->file($this->getPathFromId($imageId));
    }

    private function apiRenderPage($imageId, $imageUrl)
    {
        return response()->json([
            'id' => $imageId,
            'url' => $imageUrl,
        ]);
    }

    private function getRandomImagePath()
    {
        return Arr::random(
            Arr::where(File::allFiles(public_path('/images')), function ($image) {
                return Str::endsWith($image, '.jpg');
            })
        );
    }

    private function getIdAndUrlFromPath($imagePath)
    {
        $imageId = Str::beforeLast(Str::afterLast($imagePath, '-'), '.jpg');
        $imageUrl = url('/') . "/images/bentley-{$imageId}.jpg";

        return [$imageId, $imageUrl];
    }

    private function getPathFromId($imageId)
    {
        return public_path('/images/') . 'bentley-' . $imageId . '.jpg';
    }

    private function imageExists($imagePath)
    {
        return in_array($imagePath, File::allFiles(public_path('/images')));
    }
}