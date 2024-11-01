<?php

namespace Drupal\hello_world\Controller;

use Drupal\Core\StringTranslation\StringTranslationTrait;

/**
 * Test class.
 */
class HelloController {
  use StringTranslationTrait;

  /**
   * Test function.
   */
  public function content() {
    return [
      '#type' => 'markup',
      '#markup' => $this->t('Hello, World!'),
    ];
  }

}
