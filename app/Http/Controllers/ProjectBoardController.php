<?php

namespace App\Http\Controllers;

use App\Common;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Session;

class ProjectBoardController extends BaseController
{
	public function getAjaxWork()
	{
		$plan = [
			0 => [
				'Title' => 'Learn Backend',
				'creatAt' => '20/12/1999',
			],
			1 => [
				'Title' => 'Learn IETLS',
				'creatAt' => '20/12/1999',
			],
			2 => [
				'Title' => 'FullStack',
				'creatAt' => '20/12/1999',
			],
		];

		$progress = [
			0 => [
				'Title' => 'Learn Fronted',
				'creatAt' => '20/12/1999',
			],
			1 => [
				'Title' => 'Learn JS',
				'creatAt' => '20/12/1999',
			],
			2 => [
				'Title' => 'Learn more English',
				'creatAt' => '20/12/1999',
			],
			3 => [
				'Title' => 'Learn Sth',
				'creatAt' => '20/12/1999',
			],
		];

		$done = [
			0 => [
				'Title' => 'Toeic 600',
				'creatAt' => '20/12/1999',
			],
			1 => [
				'Title' => 'NextJs',
				'creatAt' => '20/12/1999',
			],
			2 => [
				'Title' => 'Ant design',
				'creatAt' => '20/12/1999',
			],
			3 => [
				'Title' => 'Type Script',
				'creatAt' => '20/12/1999',
			],
		];
		
		$view=request()->get('view');

		$html = view('20221206.portfolio.work._ajax.projectboard', compact('plan','progress','done','view'))->render();
		return response()->json(['html' => $html]);
	}

	public function index()
	{
		return view('20221206.portfolio.work.index');
	}
}