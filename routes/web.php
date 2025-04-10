<?php

use App\Http\Controllers\Admin\ImplementationController;
use App\Http\Controllers\Admin\SupportController;
use App\Http\Controllers\Frontend\AgencyController;
use App\Http\Controllers\Frontend\GovernmentController;
use App\Http\Controllers\Frontend\HomeController;
use App\Http\Controllers\Frontend\NewsController;
use App\Http\Controllers\Frontend\RegionController;
use App\Http\Controllers\ProfileController;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;



Route::group(['middleware' => 'auth.basic'], function () {
  Route::get('/', [HomeController::class, 'index'])->name('home');
  Route::get('/news/{url}', [HomeController::class, 'index'])->name('post.show');
  Route::get('/search', [App\Http\Controllers\Frontend\SearchController::class, 'searchResults'])->name('search.index');

  Route::get('/search/page', [App\Http\Controllers\Frontend\SearchController::class, 'searchPage'])->name('search.page');
  Route::get('/national-projects', [HomeController::class, 'nationalProjects'])->name('natProjects');
  Route::get('/military-support', [HomeController::class, 'svoSupport'])->name('svoSupport');
  Route::get('/contacts', [HomeController::class, 'contacts'])->name('contacts');
  Route::get('/media', [HomeController::class, 'media'])->name('media');
  Route::get('/implementations', [HomeController::class, 'implementations'])->name('implementations');
  Route::get('/anticorruptions', [HomeController::class, 'anticorruptions'])->name('anticorruptions');
  Route::get('/economic-support', [HomeController::class, 'economicSupport'])->name('economicSupport');
  Route::get('/konkurses', [HomeController::class, 'konkurs'])->name('konkurs');
  Route::get('/simvols', [HomeController::class, 'simvols'])->name('simvols');
  Route::get('/3d-tour-glory', [HomeController::class, 'gloryTour'])->name('gloryTour');
  Route::get('/managment-reserves', [HomeController::class, 'managmentReserves'])->name('homeManagmentReserves.index');
  Route::get('/judicial-authorities', [HomeController::class, 'judicialAuthorities'])->name('judicialAuthorities.index');
  Route::get('/federal-authorities', [HomeController::class, 'federalAuthorities'])->name('federalAuthorities.index');
  Route::get('/antinar', [HomeController::class, 'antinar'])->name('antinars.index');
  Route::get('/smi', [HomeController::class, 'smi'])->name('smi.index');
  Route::get('/award-politic', [HomeController::class, 'awardPolitic'])->name('awardPolitics.index');
  Route::get('/civil-service', [HomeController::class, 'civilService'])->name('civilServices.index');




  Route::get('/president', [HomeController::class, 'president'])->name('president');
  Route::prefix('government')->group(function () {
    Route::get('/', [GovernmentController::class, 'government'])->name('government');
    Route::get('/structure', [GovernmentController::class, 'structure'])->name('structure');
    Route::get('/abilities', [GovernmentController::class, 'abilities'])->name('abilities');
    Route::get('/sessions', [GovernmentController::class, 'sessions'])->name('sessions');
    Route::get('/plans', [GovernmentController::class, 'plan'])->name('plan');
    Route::get('/colleagues', [GovernmentController::class, 'colleagues'])->name('colleagues');
    Route::get('/directories', [GovernmentController::class, 'directories'])->name('directories');
  });

  Route::get('/documents', [HomeController::class, 'documents'])->name('documents');

  Route::get('/region', [RegionController::class, 'index'])->name('region');
  Route::get('/economic', [RegionController::class, 'economic'])->name('economic');
  Route::get('/social-economic-development', [RegionController::class, 'socialEconomicDevelopment'])->name('socialEconomicDevelopment');
  Route::get('/municipalities', [RegionController::class, 'municipalities'])->name('municipality');
  Route::get('/history', [RegionController::class, 'history'])->name('history');

  Route::get('/agencies', [AgencyController::class, 'index'])->name('agencies.index');
  Route::get('/agencies/{agency:slug}', [AgencyController::class, 'singleAgency'])->name('agencies.single');
  Route::get('/region', function () {
    return Inertia::render('Region/Region');
  });
  Route::get('/economic', function () {
    return Inertia::render('Region/Economics');
  });
  Route::get('/history', function () {
    return Inertia::render('Region/History');
  });

  Route::get('/municipality', [RegionController::class, 'municipalities'])->name('municipalities');
  Route::get('/nation-projects', [RegionController::class, 'nationalProjects'])->name('nation-projects');
  Route::get('/pravitelstvo', function () {
    return Inertia::render('Authority/Authority');
  });

  Route::get('/sostav-pravitelstva', function () {
    return Inertia::render('Authority/GovernmentTeam');
  });


  Route::get('/news', [NewsController::class, 'index'])->name('news.index');
  Route::get('/news/{id}', [HomeController::class, 'index'])->name('news.show');
  Route::get('/news-by-category/{categoryId}', [NewsController::class, 'getPostsByCategory'])->name('posts.by.tag');

});

Route::group(['namespace' => 'Admin', 'middleware' => \App\Http\Middleware\Admin::class], function () {
    Route::get('/raduga', [\App\Http\Controllers\Admin\IndexController::class, 'index'])->middleware(['auth', 'verified'])->name('admin');


    Route::get('/raduga/search', [App\Http\Controllers\Admin\SearchController::class, 'index'])->name('admin.search');

    Route::group(['namespace' => 'News', 'prefix' => 'raduga'], function () {
        Route::get('/news', [App\Http\Controllers\Admin\NewsController::class, 'index'])->name('admin.news.index');
        Route::get('/news/create', [App\Http\Controllers\Admin\NewsController::class, 'create'])->name('admin.news.create');
        Route::post('/news/store', [App\Http\Controllers\Admin\NewsController::class, 'store'])->name('admin.news.store');
        Route::get('/news/{news:url}/edit', [App\Http\Controllers\Admin\NewsController::class, 'edit'])->name('admin.news.edit');
        Route::patch('/news/{news:url}', [App\Http\Controllers\Admin\NewsController::class, 'update'])->name('admin.news.update');
        Route::delete('/news/{news:url}', [App\Http\Controllers\Admin\NewsController::class, 'destroy'])->name('admin.news.delete');
    });

    Route::group(['namespace' => 'NewsIng', 'prefix' => 'raduga'], function () {
        Route::get('/news-ing', [App\Http\Controllers\Admin\NewsIngController::class, 'index'])->name('admin.newsIng.index');
        Route::get('/news-ing/create', [App\Http\Controllers\Admin\NewsIngController::class, 'create'])->name('admin.newsIng.create');
        Route::post('/news-ing/store', [App\Http\Controllers\Admin\NewsIngController::class, 'store'])->name('admin.newsIng.store');
        Route::get('/news-ing/{news}/edit', [App\Http\Controllers\Admin\NewsIngController::class, 'edit'])->name('admin.newsIng.edit');
        Route::patch('/news-ing/{news}', [App\Http\Controllers\Admin\NewsIngController::class, 'update'])->name('admin.newsIng.update');
        Route::delete('/news-ing/{news}', [App\Http\Controllers\Admin\NewsIngController::class, 'destroy'])->name('admin.newsIng.delete');

    });


    Route::group(['namespace' => 'Video', 'prefix' => 'raduga'], function () {
        Route::get('/videos', [App\Http\Controllers\Admin\VideoController::class, 'index'])->name('admin.videos.index');
        Route::get('/videos/create', [App\Http\Controllers\Admin\VideoController::class, 'create'])->name('admin.videos.create');
        Route::post('/videos/store', [App\Http\Controllers\Admin\VideoController::class, 'store'])->name('admin.videos.store');
        Route::get('/videos/{video}/edit', [App\Http\Controllers\Admin\VideoController::class, 'edit'])->name('admin.videos.edit');
        Route::patch('/videos/{video}', [App\Http\Controllers\Admin\VideoController::class, 'update'])->name('admin.videos.update');
        Route::delete('/videos/{video}', [App\Http\Controllers\Admin\VideoController::class, 'destroy'])->name('admin.videos.delete');

    });

    Route::group(['namespace' => 'PhotoReportage', 'prefix' => 'raduga'], function () {
        Route::get('/photo-reportage', [App\Http\Controllers\Admin\PhotoReportageController::class, 'index'])->name('admin.photoReportage.index');
        Route::get('/photo-reportage/create', [App\Http\Controllers\Admin\PhotoReportageController::class, 'create'])->name('admin.photoReportage.create');
        Route::post('/photo-reportage/store', [App\Http\Controllers\Admin\PhotoReportageController::class, 'store'])->name('admin.photoReportage.store');
        Route::get('/photo-reportage/{reportage}/edit', [App\Http\Controllers\Admin\PhotoReportageController::class, 'edit'])->name('admin.photoReportage.edit');
        Route::patch('/photo-reportage/{reportage}', [App\Http\Controllers\Admin\PhotoReportageController::class, 'update'])->name('admin.photoReportage.update');
        Route::delete('/photo-reportage/{reportage}', [App\Http\Controllers\Admin\PhotoReportageController::class, 'destroy'])->name('admin.photoReportage.delete');
        Route::get('/admin/news/search', [App\Http\Controllers\Admin\PhotoReportageController::class, 'searchNews'])->name('admin.news.search');

    });

    Route::group(['namespace' => 'Category', 'prefix' => 'raduga'], function () {
        Route::get('/categories', [App\Http\Controllers\Admin\CategoryController::class, 'index'])->name('admin.categories.index');

        Route::get('/categories/create', [App\Http\Controllers\Admin\CategoryController::class, 'create'])->name('admin.categories.create');
        Route::post('/categories/store', [App\Http\Controllers\Admin\CategoryController::class, 'store'])->name('admin.categories.store');
        Route::get('/categories/{category}/edit', [App\Http\Controllers\Admin\CategoryController::class, 'edit'])->name('admin.categories.edit');
        Route::patch('/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'update'])->name('admin.categories.update');
        Route::delete('/categories/{category}', [App\Http\Controllers\Admin\CategoryController::class, 'destroy'])->name('admin.categories.delete');

    });

    Route::group(['namespace' => 'Document', 'prefix' => 'raduga'], function () {
        Route::get('/documents', [App\Http\Controllers\Admin\DocumentController::class, 'index'])->name('admin.documents.index');

        Route::get('/documents/create', [App\Http\Controllers\Admin\DocumentController::class, 'create'])->name('admin.documents.create');
        Route::post('/documents/store', [App\Http\Controllers\Admin\DocumentController::class, 'store'])->name('admin.documents.store');
        Route::get('/documents/{document}/edit', [App\Http\Controllers\Admin\DocumentController::class, 'edit'])->name('admin.documents.edit');
        Route::patch('/documents/{document}', [App\Http\Controllers\Admin\DocumentController::class, 'update'])->name('admin.documents.update');
        Route::delete('/documents/{document}', [App\Http\Controllers\Admin\DocumentController::class, 'destroy'])->name('admin.documents.delete');

    });

    Route::group(['namespace' => 'Document', 'prefix' => 'raduga'], function () {
        Route::get('/konkurses', [App\Http\Controllers\Admin\KonkursController::class, 'index'])->name('admin.konkurses.index');

        Route::get('/konkurses/create', [App\Http\Controllers\Admin\KonkursController::class, 'create'])->name('admin.konkurses.create');
        Route::post('/konkurses/store', [App\Http\Controllers\Admin\KonkursController::class, 'store'])->name('admin.konkurses.store');
        Route::get('/konkurses/{konkurs}/edit', [App\Http\Controllers\Admin\KonkursController::class, 'edit'])->name('admin.konkurses.edit');
        Route::patch('/konkurses/{konkurs}', [App\Http\Controllers\Admin\KonkursController::class, 'update'])->name('admin.konkurses.update');
        Route::delete('/konkurses/{konkurs}', [App\Http\Controllers\Admin\KonkursController::class, 'destroy'])->name('admin.konkurses.delete');

    });

    Route::group(['namespace' => 'ManagmentReserve', 'prefix' => 'raduga'], function () {
        Route::get('/managment-reserve', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'index'])->name('admin.managmentReserves.index');

        Route::get('/managment-reserve/create', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'create'])->name('admin.managmentReserves.create');
        Route::post('/managment-reserves/store', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'store'])->name('admin.managmentReserves.store');
        Route::get('/managment-reservese/{managmentReserve}/edit', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'edit'])->name('admin.managmentReserves.edit');
        Route::patch('/managment-reserve/{managmentReserve}', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'update'])->name('admin.managmentReserves.update');
        Route::delete('/managment-reserve/{managmentReserve}', [App\Http\Controllers\Admin\ManagmentReserveController::class, 'destroy'])->name('admin.managmentReserves.delete');

    });

    Route::group(['namespace' => 'Page', 'prefix' => 'raduga'], function () {
        Route::get('/pages', [App\Http\Controllers\Admin\PageController::class, 'index'])->name('admin.page.index');

        Route::get('/pages/create', [App\Http\Controllers\Admin\PageController::class, 'create'])->name('admin.page.create');
        Route::post('/pages/store', [App\Http\Controllers\Admin\PageController::class, 'store'])->name('admin.page.store');
        Route::get('/pages/{page}/edit', [App\Http\Controllers\Admin\PageController::class, 'edit'])->name('admin.page.edit');
        Route::patch('/pages/{page}', [App\Http\Controllers\Admin\PageController::class, 'update'])->name('admin.page.update');
        Route::delete('/pages/{page}', [App\Http\Controllers\Admin\PageController::class, 'destroy'])->name('admin.page.delete');

    });

    Route::group(['namespace' => 'Implementation', 'prefix' => 'raduga'], function () {
        Route::get('/implementation', [App\Http\Controllers\Admin\ImplementationController::class, 'index'])->name('admin.implementations.index');

        Route::get('/implementations/create', [App\Http\Controllers\Admin\ImplementationController::class, 'create'])->name('admin.implementations.create');
        Route::post('/implementations/store', [App\Http\Controllers\Admin\ImplementationController::class, 'store'])->name('admin.implementations.store');
        Route::get('/implementations/{implementation}/edit', [App\Http\Controllers\Admin\ImplementationController::class, 'edit'])->name('admin.implementations.edit');
        Route::patch('/implementations/{implementation}', [App\Http\Controllers\Admin\ImplementationController::class, 'update'])->name('admin.implementations.update');
        Route::delete('/implementations/{implementation}', [App\Http\Controllers\Admin\ImplementationController::class, 'destroy'])->name('admin.implementations.delete');

    });

    Route::group(['namespace' => 'SocialEconomicDevelopment', 'prefix' => 'raduga'], function () {
        Route::get('/social-economic-development', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'index'])->name('admin.socialEconomicDevelopments.index');

        Route::get('/social-economic-development/create', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'create'])->name('admin.socialEconomicDevelopments.create');
        Route::post('/social-economic-development/store', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'store'])->name('admin.socialEconomicDevelopments.store');
        Route::get('/social-economic-development/{socialEconomicDevelopment}/edit', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'edit'])->name('admin.socialEconomicDevelopments.edit');
        Route::patch('/social-economic-development/{socialEconomicDevelopment}', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'update'])->name('admin.socialEconomicDevelopments.update');
        Route::delete('/social-economic-development/{socialEconomicDevelopment}', [App\Http\Controllers\Admin\SocialEconomicDevelopmentController::class, 'destroy'])->name('admin.socialEconomicDevelopments.delete');

    });

    Route::group(['namespace' => 'Anticorruption', 'prefix' => 'raduga'], function () {
        Route::get('/anticorruptions', [App\Http\Controllers\Admin\AnticorruptionController::class, 'index'])->name('admin.anticorruptions.index');

        Route::get('/anticorruptions/create', [App\Http\Controllers\Admin\AnticorruptionController::class, 'create'])->name('admin.anticorruptions.create');
        Route::post('/anticorruptions/store', [App\Http\Controllers\Admin\AnticorruptionController::class, 'store'])->name('admin.anticorruptions.store');
        Route::get('/anticorruptions/{anticorruption}/edit', [App\Http\Controllers\Admin\AnticorruptionController::class, 'edit'])->name('admin.anticorruptions.edit');
        Route::patch('/anticorruptions/{anticorruption}', [App\Http\Controllers\Admin\AnticorruptionController::class, 'update'])->name('admin.anticorruptions.update');
        Route::delete('/anticorruptions/{anticorruption}', [App\Http\Controllers\Admin\AnticorruptionController::class, 'destroy'])->name('admin.anticorruptions.delete');

    });

    Route::group(['namespace' => 'EconomicSupport', 'prefix' => 'raduga'], function () {
        Route::get('/economic-support', [App\Http\Controllers\Admin\EconomicSupportController::class, 'index'])->name('admin.economicSupports.index');

        Route::get('/economic-support/create', [App\Http\Controllers\Admin\EconomicSupportController::class, 'create'])->name('admin.economicSupports.create');
        Route::post('/economic-support/store', [App\Http\Controllers\Admin\EconomicSupportController::class, 'store'])->name('admin.economicSupports.store');
        Route::get('/economic-support/{economicSupport}/edit', [App\Http\Controllers\Admin\EconomicSupportController::class, 'edit'])->name('admin.economicSupports.edit');
        Route::patch('/economic-support/{economicSupport}', [App\Http\Controllers\Admin\EconomicSupportController::class, 'update'])->name('admin.economicSupports.update');
        Route::delete('/economic-support/{economicSupport}', [App\Http\Controllers\Admin\EconomicSupportController::class, 'destroy'])->name('admin.economicSupports.delete');

    });

    Route::group(['namespace' => 'Contact', 'prefix' => 'raduga'], function () {
        Route::get('/contacts', [App\Http\Controllers\Admin\ContactController::class, 'index'])->name('admin.contacts.index');
        Route::get('/contacts/create', [App\Http\Controllers\Admin\ContactController::class, 'create'])->name('admin.contacts.create');
        Route::post('/contacts/store', [App\Http\Controllers\Admin\ContactController::class, 'store'])->name('admin.contacts.store');
        Route::get('/contacts/{contact}/edit', [App\Http\Controllers\Admin\ContactController::class, 'edit'])->name('admin.contacts.edit');
        Route::patch('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'update'])->name('admin.contacts.update');
        Route::delete('/contacts/{contact}', [App\Http\Controllers\Admin\ContactController::class, 'destroy'])->name('admin.contacts.delete');

    });

    Route::group(['namespace' => 'NationalProject', 'prefix' => 'raduga'], function () {
        Route::get('/national-projects', [App\Http\Controllers\Admin\NationalProjectController::class, 'index'])->name('admin.natProjects.index');
        Route::get('/national-projects/create', [App\Http\Controllers\Admin\NationalProjectController::class, 'create'])->name('admin.natProjects.create');
        Route::post('/national-projects/store', [App\Http\Controllers\Admin\NationalProjectController::class, 'store'])->name('admin.natProjects.store');
        Route::get('/national-projects/{nationalProject}/edit', [App\Http\Controllers\Admin\NationalProjectController::class, 'edit'])->name('admin.natProjects.edit');
        Route::patch('/national-projects/{nationalProject}', [App\Http\Controllers\Admin\NationalProjectController::class, 'update'])->name('admin.natProjects.update');
        Route::delete('/national-projects/{nationalProject}', [App\Http\Controllers\Admin\NationalProjectController::class, 'destroy'])->name('admin.natProjects.delete');

    });

    Route::group(['namespace' => 'MilitarySupport', 'prefix' => 'raduga'], function () {
        Route::get('/military-support', [App\Http\Controllers\Admin\MilitarySupportController::class, 'index'])->name('admin.militarySupport.index');
        Route::get('/military-support/create', [App\Http\Controllers\Admin\MilitarySupportController::class, 'create'])->name('admin.militarySupport.create');
        Route::post('/military-support/store', [App\Http\Controllers\Admin\MilitarySupportController::class, 'store'])->name('admin.militarySupport.store');
        Route::get('/military-support/{militarySupport}/edit', [App\Http\Controllers\Admin\MilitarySupportController::class, 'edit'])->name('admin.militarySupport.edit');
        Route::patch('/military-support/{militarySupport}', [App\Http\Controllers\Admin\MilitarySupportController::class, 'update'])->name('admin.militarySupport.update');
        Route::delete('/military-support/{militarySupport}', [App\Http\Controllers\Admin\MilitarySupportController::class, 'destroy'])->name('admin.militarySupport.delete');

    });

    Route::group(['namespace' => 'Resource', 'prefix' => 'raduga'], function () {
        Route::get('/resources', [App\Http\Controllers\Admin\ResourceController::class, 'index'])->name('admin.resources.index');

        Route::get('/resources/create', [App\Http\Controllers\Admin\ResourceController::class, 'create'])->name('admin.resources.create');
        Route::post('/resources/store', [App\Http\Controllers\Admin\ResourceController::class, 'store'])->name('admin.resources.store');
        Route::get('/resources/{resource}/edit', [App\Http\Controllers\Admin\ResourceController::class, 'edit'])->name('admin.resources.edit');
        Route::patch('/resources/{resource}', [App\Http\Controllers\Admin\ResourceController::class, 'update'])->name('admin.resources.update');
        Route::delete('/resources/{resource}', [App\Http\Controllers\Admin\ResourceController::class, 'destroy'])->name('admin.resources.delete');

    });

    Route::group(['namespace' => 'FederalAuthority', 'prefix' => 'raduga'], function () {
        Route::get('/federal-authorities', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'index'])->name('admin.federalAuthorities.index');

        Route::get('/federal-authorities/create', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'create'])->name('admin.federalAuthorities.create');
        Route::post('/federal-authorities/store', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'store'])->name('admin.federalAuthorities.store');
        Route::get('/federal-authorities/{federalAuthority}/edit', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'edit'])->name('admin.federalAuthorities.edit');
        Route::patch('/federal-authorities/{federalAuthority}', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'update'])->name('admin.federalAuthorities.update');
        Route::delete('/federal-authorities/{federalAuthority}', [App\Http\Controllers\Admin\FederalAuthorityController::class, 'destroy'])->name('admin.federalAuthorities.delete');

    });


    Route::group(['namespace' => 'Antinar', 'prefix' => 'raduga'], function () {
        Route::get('/antinar', [App\Http\Controllers\Admin\AntinarController::class, 'index'])->name('admin.antinars.index');

        Route::get('/antinar/create', [App\Http\Controllers\Admin\AntinarController::class, 'create'])->name('admin.antinars.create');
        Route::post('/antinar/store', [App\Http\Controllers\Admin\AntinarController::class, 'store'])->name('admin.antinars.store');
        Route::get('/antinar/{antinar}/edit', [App\Http\Controllers\Admin\AntinarController::class, 'edit'])->name('admin.antinars.edit');
        Route::patch('/antinar/{antinar}', [App\Http\Controllers\Admin\AntinarController::class, 'update'])->name('admin.antinars.update');
        Route::delete('/antinar/{antinar}', [App\Http\Controllers\Admin\AntinarController::class, 'destroy'])->name('admin.antinars.delete');

    });


    Route::group(['namespace' => 'AwardPolitic', 'prefix' => 'raduga'], function () {
        Route::get('/award-politics', [App\Http\Controllers\Admin\AwardPoliticController::class, 'index'])->name('admin.awardPolitics.index');

        Route::get('/award-politics/create', [App\Http\Controllers\Admin\AwardPoliticController::class, 'create'])->name('admin.awardPolitics.create');
        Route::post('/award-politics/store', [App\Http\Controllers\Admin\AwardPoliticController::class, 'store'])->name('admin.awardPolitics.store');
        Route::get('/award-politics/{awardPolitic}/edit', [App\Http\Controllers\Admin\AwardPoliticController::class, 'edit'])->name('admin.awardPolitics.edit');
        Route::patch('/award-politics/{awardPolitic}', [App\Http\Controllers\Admin\AwardPoliticController::class, 'update'])->name('admin.awardPolitics.update');
        Route::delete('/award-politics/{awardPolitic}', [App\Http\Controllers\Admin\AwardPoliticController::class, 'destroy'])->name('admin.awardPolitics.delete');

    });


    Route::group(['namespace' => 'CivilReserve', 'prefix' => 'raduga'], function () {
        Route::get('/civil-reserve', [App\Http\Controllers\Admin\CivilReserveController::class, 'index'])->name('admin.civilReserves.index');

        Route::get('/civil-reserve/create', [App\Http\Controllers\Admin\CivilReserveController::class, 'create'])->name('admin.civilReserves.create');
        Route::post('/civil-reserve/store', [App\Http\Controllers\Admin\CivilReserveController::class, 'store'])->name('admin.civilReserves.store');
        Route::get('/civil-reserve/{civilReserve}/edit', [App\Http\Controllers\Admin\CivilReserveController::class, 'edit'])->name('admin.civilReserves.edit');
        Route::patch('/civil-reserve/{civilReserve}', [App\Http\Controllers\Admin\CivilReserveController::class, 'update'])->name('admin.civilReserves.update');
        Route::delete('/civil-reserve/{civilReserve}', [App\Http\Controllers\Admin\CivilReserveController::class, 'destroy'])->name('admin.civilReserves.delete');

    });

    Route::group(['namespace' => 'Supervisor', 'prefix' => 'raduga'], function () {
        Route::get('/supervisors', [App\Http\Controllers\Admin\SupervisorController::class, 'index'])->name('admin.supervisors.index');

        Route::get('/supervisors/create', [App\Http\Controllers\Admin\SupervisorController::class, 'create'])->name('admin.supervisors.create');
        Route::post('/supervisors/store', [App\Http\Controllers\Admin\SupervisorController::class, 'store'])->name('admin.supervisors.store');
        Route::get('/supervisors/{supervisor}/edit', [App\Http\Controllers\Admin\SupervisorController::class, 'edit'])->name('admin.supervisors.edit');
        Route::patch('/supervisors/{supervisor}', [App\Http\Controllers\Admin\SupervisorController::class, 'update'])->name('admin.supervisors.update');
        Route::delete('/supervisors/{supervisor}', [App\Http\Controllers\Admin\SupervisorController::class, 'destroy'])->name('admin.supervisors.delete');

    });

  Route::group(['namespace' => 'Minister', 'prefix' => 'raduga'], function () {
    Route::get('/ministers', [App\Http\Controllers\Admin\MinisterController::class, 'index'])->name('admin.ministers.index');

    Route::get('/ministers/create', [App\Http\Controllers\Admin\MinisterController::class, 'create'])->name('admin.ministers.create');
    Route::post('/ministers/store', [App\Http\Controllers\Admin\MinisterController::class, 'store'])->name('admin.ministers.store');
    Route::get('/ministers/{minister}/edit', [App\Http\Controllers\Admin\MinisterController::class, 'edit'])->name('admin.ministers.edit');
    Route::patch('/ministers/{minister}', [App\Http\Controllers\Admin\MinisterController::class, 'update'])->name('admin.ministers.update');
    Route::delete('/ministers/{minister}', [App\Http\Controllers\Admin\MinisterController::class, 'destroy'])->name('admin.ministers.delete');

  });

    Route::group(['namespace' => 'Municipality', 'prefix' => 'raduga'], function () {
        Route::get('/municipalities', [App\Http\Controllers\Admin\MunicipalityController::class, 'index'])->name('admin.municipalities.index');

        Route::get('/municipalities/create', [App\Http\Controllers\Admin\MunicipalityController::class, 'create'])->name('admin.municipalities.create');
        Route::post('/municipalities/store', [App\Http\Controllers\Admin\MunicipalityController::class, 'store'])->name('admin.municipalities.store');
        Route::get('/municipalities/{municipality}/edit', [App\Http\Controllers\Admin\MunicipalityController::class, 'edit'])->name('admin.municipalities.edit');
        Route::patch('/municipalities/{municipality}', [App\Http\Controllers\Admin\MunicipalityController::class, 'update'])->name('admin.municipalities.update');
        Route::delete('/municipalities/{municipality}', [App\Http\Controllers\Admin\MunicipalityController::class, 'destroy'])->name('admin.municipalities.delete');

    });

    Route::group(['namespace' => 'Agency', 'prefix' => 'raduga'], function () {
        Route::get('/agencies', [App\Http\Controllers\Admin\AgencyController::class, 'index'])->name('admin.agencies.index');

        Route::get('/agencies/create', [App\Http\Controllers\Admin\AgencyController::class, 'create'])->name('admin.agencies.create');
        Route::post('/agencies/store', [App\Http\Controllers\Admin\AgencyController::class, 'store'])->name('admin.agencies.store');
        Route::get('/agencies/{agency}/edit', [App\Http\Controllers\Admin\AgencyController::class, 'edit'])->name('admin.agencies.edit');
        Route::patch('/agencies/{agency}', [App\Http\Controllers\Admin\AgencyController::class, 'update'])->name('admin.agencies.update');
        Route::delete('/agencies/{agency}', [App\Http\Controllers\Admin\AgencyController::class, 'destroy'])->name('admin.agencies.delete');

    });

    Route::group(['namespace' => 'Mountain', 'prefix' => 'raduga'], function () {
        Route::get('/mountains', [App\Http\Controllers\Admin\MountainController::class, 'index'])->name('admin.mountains.index');

        Route::get('/mountains/create', [App\Http\Controllers\Admin\MountainController::class, 'create'])->name('admin.mountains.create');
        Route::post('/mountains/store', [App\Http\Controllers\Admin\MountainController::class, 'store'])->name('admin.mountains.store');
        Route::get('/mountains/{mountain}/edit', [App\Http\Controllers\Admin\MountainController::class, 'edit'])->name('admin.mountains.edit');
        Route::patch('/mountains/{mountain}', [App\Http\Controllers\Admin\MountainController::class, 'update'])->name('admin.mountains.update');
        Route::delete('/mountains/{mountain}', [App\Http\Controllers\Admin\MountainController::class, 'destroy'])->name('admin.mountains.delete');

    });

    Route::group(['namespace' => 'AgencyActivity', 'prefix' => 'raduga'], function () {
        Route::get('/agencies-activity', [App\Http\Controllers\Admin\AgencyActivityController::class, 'index'])->name('admin.agenciesActivity.index');

        Route::get('/agencies-activity/create', [App\Http\Controllers\Admin\AgencyActivityController::class, 'create'])->name('admin.agenciesActivity.create');
        Route::post('/agencies-activity/store', [App\Http\Controllers\Admin\AgencyActivityController::class, 'store'])->name('admin.agenciesActivity.store');
        Route::get('/agencies-activity/{agencyActivity}/edit', [App\Http\Controllers\Admin\AgencyActivityController::class, 'edit'])->name('admin.agenciesActivity.edit');
        Route::patch('/agencies-activity/{agencyActivity}', [App\Http\Controllers\Admin\AgencyActivityController::class, 'update'])->name('admin.agenciesActivity.update');
        Route::delete('/agencies-activity/{agencyActivity}', [App\Http\Controllers\Admin\AgencyActivityController::class, 'destroy'])->name('admin.agenciesActivity.delete');

    });

    Route::group(['namespace' => 'User', 'prefix' => 'raduga'], function () {
        Route::get('/users', [App\Http\Controllers\Admin\UserController::class, 'index'])->name('admin.users.index');

        Route::get('/users/create', [App\Http\Controllers\Admin\UserController::class, 'create'])->name('admin.users.create');
        Route::post('/users/store', [App\Http\Controllers\Admin\UserController::class, 'store'])->name('admin.users.store');
        Route::get('/users/{user}/edit', [App\Http\Controllers\Admin\UserController::class, 'edit'])->name('admin.users.edit');
        Route::patch('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'update'])->name('admin.users.update');
        Route::delete('/users/{user}', [App\Http\Controllers\Admin\UserController::class, 'destroy'])->name('admin.users.delete');

    });


    Route::post('/support', [SupportController::class, 'store'])->name('support.store');
});

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
