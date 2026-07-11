<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Symfony\Component\Process\Exception\ProcessFailedException;
use Symfony\Component\Process\Process;

class AdminRebuildController extends Controller
{
    /**
     * Runs `npm run build` so a production deployment picks up edits made through
     * the admin without needing to SSH in. Only meaningful when npm/node are
     * available on the server this Laravel app runs on.
     */
    public function store(): RedirectResponse
    {
        $process = new Process(['npm', 'run', 'build'], base_path(), null, null, 300);

        try {
            $process->mustRun();

            return redirect()
                ->route('admin.dashboard')
                ->with('status', 'Build finished successfully.')
                ->with('buildOutput', $this->tail($process->getOutput().$process->getErrorOutput()));
        } catch (ProcessFailedException $e) {
            return redirect()
                ->route('admin.dashboard')
                ->with('error', 'Build failed.')
                ->with('buildOutput', $this->tail($e->getProcess()->getOutput().$e->getProcess()->getErrorOutput()));
        }
    }

    private function tail(string $output): string
    {
        return substr($output, -4000);
    }
}
